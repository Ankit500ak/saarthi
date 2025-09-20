// pages/api/internships.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Example internship data
    const internships = [
      {
        title: "Software Engineer Intern",
        department: "Engineering",
        location: "Remote",
        duration: "3 months",
        stipend: "$1000/month",
        skills: ["JavaScript", "React", "Node.js"],
        featured: true,
      },
      {
        title: "Data Analyst Intern",
        department: "Data Science",
        location: "New York, NY",
        duration: "6 months",
        stipend: "$1200/month",
        skills: ["Python", "SQL", "Tableau"],
        featured: false,
      },
    ];

    res.status(200).json(internships);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}