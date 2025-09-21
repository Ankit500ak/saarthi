import joblib
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from django.conf import settings

# Global variables to cache loaded models
_vectorizer = None
_rf_model = None
_data = None

def load_models():
    """
    Load the ML models and data. This function caches the models to avoid
    reloading them on every request.
    """
    global _vectorizer, _rf_model, _data
    
    if _vectorizer is None or _rf_model is None or _data is None:
        # Get the base directory (Django project root)
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        
        # Load the vectorizer
        vectorizer_path = os.path.join(base_dir, 'vectorizer.joblib')
        _vectorizer = joblib.load(vectorizer_path)
        
        # Load the random forest model
        model_path = os.path.join(base_dir, 'rf_model.joblib')
        _rf_model = joblib.load(model_path)
        
        # Load the data
        data_path = os.path.join(base_dir, 'combined_data.xlsx')
        _data = pd.read_excel(data_path)
    
    return _vectorizer, _rf_model, _data

def recommend_jobs(user_skills, top_n=3):
    """
    Recommend jobs based on user skills.
    
    Args:
        user_skills (list): List of user skills as strings
        top_n (int): Number of top recommendations to return
    
    Returns:
        list: List of dictionaries containing job recommendations with title and match_score
    """
    try:
        # Load models and data
        vectorizer, rf_model, data = load_models()
        
        # Convert user skills to a single string
        user_skills_text = ' '.join(user_skills)
        
        # Vectorize user skills
        user_vector = vectorizer.transform([user_skills_text])
        
        # Get job skills from data (assuming there's a 'skills' or similar column)
        # You may need to adjust this based on your actual data structure
        job_skills_columns = []
        for col in data.columns:
            if 'skill' in col.lower() or 'requirement' in col.lower() or 'technology' in col.lower():
                job_skills_columns.append(col)
        
        if not job_skills_columns:
            # Fallback: use a 'skills' column if it exists, or create a combined skills text
            if 'skills' in data.columns:
                job_skills_text = data['skills'].fillna('').astype(str)
            elif 'Skills' in data.columns:
                job_skills_text = data['Skills'].fillna('').astype(str)
            else:
                # Try to find any text column that might contain skills
                text_columns = data.select_dtypes(include=['object']).columns
                if len(text_columns) > 1:
                    # Combine all text columns
                    job_skills_text = data[text_columns].fillna('').apply(lambda x: ' '.join(x), axis=1)
                else:
                    raise ValueError("No suitable skills column found in the data")
        else:
            # Combine all skill-related columns
            job_skills_text = data[job_skills_columns].fillna('').apply(lambda x: ' '.join(x), axis=1)
        
        # Vectorize job skills
        job_vectors = vectorizer.transform(job_skills_text)
        
        # Calculate similarity scores
        similarity_scores = cosine_similarity(user_vector, job_vectors).flatten()
        
        # Get top N indices
        top_indices = similarity_scores.argsort()[-top_n:][::-1]
        
        # Prepare recommendations
        recommendations = []
        for idx in top_indices:
            job_title = ""
            
            # Try to find job title column
            if 'title' in data.columns:
                job_title = str(data.iloc[idx]['title'])
            elif 'Title' in data.columns:
                job_title = str(data.iloc[idx]['Title'])
            elif 'job_title' in data.columns:
                job_title = str(data.iloc[idx]['job_title'])
            elif 'Job Title' in data.columns:
                job_title = str(data.iloc[idx]['Job Title'])
            elif 'position' in data.columns:
                job_title = str(data.iloc[idx]['position'])
            elif 'Position' in data.columns:
                job_title = str(data.iloc[idx]['Position'])
            else:
                # Use the first text column as job title
                text_columns = data.select_dtypes(include=['object']).columns
                if len(text_columns) > 0:
                    job_title = str(data.iloc[idx][text_columns[0]])
                else:
                    job_title = f"Job {idx + 1}"
            
            # Get additional job details if available
            job_details = {
                'title': job_title,
                'match_score': float(similarity_scores[idx])
            }
            
            # Add other relevant fields if they exist
            for col in ['department', 'location', 'company', 'Company', 'duration', 'stipend']:
                if col in data.columns:
                    job_details[col.lower()] = str(data.iloc[idx][col])
            
            recommendations.append(job_details)
        
        return recommendations
    
    except Exception as e:
        # Log the error and return empty list
        print(f"Error in recommend_jobs: {str(e)}")
        return []

def get_model_info():
    """
    Get information about the loaded models and data.
    Useful for debugging and verification.
    """
    try:
        vectorizer, rf_model, data = load_models()
        return {
            'vectorizer_type': type(vectorizer).__name__,
            'model_type': type(rf_model).__name__,
            'data_shape': data.shape,
            'data_columns': list(data.columns)
        }
    except Exception as e:
        return {'error': str(e)}