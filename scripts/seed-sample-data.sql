-- Insert sample job market data
INSERT INTO job_market_data (role, industry, location, avg_salary, job_growth_rate, demand_level, required_skills) VALUES
('Software Engineer', 'Technology', 'San Francisco, CA', 120000, 15.5, 'High', ARRAY['JavaScript', 'React', 'Node.js', 'Python', 'AWS']),
('Data Scientist', 'Technology', 'New York, NY', 110000, 22.3, 'High', ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'Statistics']),
('Product Manager', 'Technology', 'Seattle, WA', 130000, 18.7, 'High', ARRAY['Product Strategy', 'Analytics', 'Agile', 'Leadership']),
('UX Designer', 'Technology', 'Austin, TX', 85000, 12.1, 'Medium', ARRAY['Figma', 'Sketch', 'User Research', 'Prototyping']),
('DevOps Engineer', 'Technology', 'Boston, MA', 115000, 25.8, 'High', ARRAY['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux']),
('Marketing Manager', 'Marketing', 'Los Angeles, CA', 75000, 8.5, 'Medium', ARRAY['Digital Marketing', 'Analytics', 'Content Strategy', 'SEO']),
('Financial Analyst', 'Finance', 'Chicago, IL', 70000, 6.2, 'Medium', ARRAY['Excel', 'Financial Modeling', 'SQL', 'Tableau']),
('Sales Representative', 'Sales', 'Miami, FL', 65000, 4.1, 'Medium', ARRAY['CRM', 'Negotiation', 'Lead Generation', 'Communication']),
('Cybersecurity Analyst', 'Technology', 'Washington, DC', 95000, 31.2, 'High', ARRAY['Network Security', 'Incident Response', 'Risk Assessment', 'CISSP']),
('Machine Learning Engineer', 'Technology', 'San Francisco, CA', 140000, 28.9, 'High', ARRAY['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Statistics']);

-- Insert sample users (for demo purposes)
INSERT INTO users (id, email, first_name, last_name) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'john.doe@example.com', 'John', 'Doe'),
('550e8400-e29b-41d4-a716-446655440001', 'jane.smith@example.com', 'Jane', 'Smith'),
('550e8400-e29b-41d4-a716-446655440002', 'mike.johnson@example.com', 'Mike', 'Johnson');

-- Insert sample user profiles
INSERT INTO user_profiles (user_id, target_role, industry, experience_level, location, bio) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Senior Software Engineer', 'Technology', 'Senior', 'San Francisco, CA', 'Passionate full-stack developer with expertise in modern web technologies'),
('550e8400-e29b-41d4-a716-446655440001', 'Data Scientist', 'Technology', 'Mid-level', 'New York, NY', 'Data enthusiast with strong background in machine learning and analytics'),
('550e8400-e29b-41d4-a716-446655440002', 'Product Manager', 'Technology', 'Senior', 'Seattle, WA', 'Strategic product leader with experience in B2B SaaS platforms');

-- Insert sample work experiences
INSERT INTO work_experiences (user_id, job_title, company, start_date, end_date, is_current, description, achievements) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Software Engineer', 'Tech Corp', '2020-01-01', NULL, TRUE, 'Full-stack development using React and Node.js', ARRAY['Led team of 5 developers', 'Improved performance by 40%', 'Mentored junior developers']),
('550e8400-e29b-41d4-a716-446655440000', 'Junior Developer', 'StartupXYZ', '2018-06-01', '2019-12-31', FALSE, 'Frontend development with React', ARRAY['Built responsive web applications', 'Collaborated with design team']),
('550e8400-e29b-41d4-a716-446655440001', 'Data Analyst', 'Analytics Inc', '2019-03-01', NULL, TRUE, 'Data analysis and machine learning model development', ARRAY['Built predictive models with 95% accuracy', 'Automated reporting processes', 'Presented insights to C-level executives']),
('550e8400-e29b-41d4-a716-446655440002', 'Product Manager', 'SaaS Solutions', '2021-02-01', NULL, TRUE, 'Product strategy and roadmap development', ARRAY['Launched 3 major features', 'Increased user engagement by 60%', 'Managed cross-functional teams']);

-- Insert sample education
INSERT INTO education (user_id, degree, field_of_study, institution, graduation_year, gpa) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Bachelor of Science', 'Computer Science', 'University of Technology', 2018, 3.8),
('550e8400-e29b-41d4-a716-446655440001', 'Master of Science', 'Data Science', 'State University', 2019, 3.9),
('550e8400-e29b-41d4-a716-446655440002', 'Bachelor of Business Administration', 'Business Administration', 'Business School', 2017, 3.7);

-- Insert sample skills
INSERT INTO skills (user_id, skill_name, proficiency_level, category) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'JavaScript', 'Expert', 'Technical'),
('550e8400-e29b-41d4-a716-446655440000', 'React', 'Expert', 'Technical'),
('550e8400-e29b-41d4-a716-446655440000', 'Node.js', 'Advanced', 'Technical'),
('550e8400-e29b-41d4-a716-446655440000', 'Python', 'Intermediate', 'Technical'),
('550e8400-e29b-41d4-a716-446655440000', 'AWS', 'Advanced', 'Technical'),
('550e8400-e29b-41d4-a716-446655440001', 'Python', 'Expert', 'Technical'),
('550e8400-e29b-41d4-a716-446655440001', 'R', 'Advanced', 'Technical'),
('550e8400-e29b-41d4-a716-446655440001', 'SQL', 'Expert', 'Technical'),
('550e8400-e29b-41d4-a716-446655440001', 'Machine Learning', 'Advanced', 'Technical'),
('550e8400-e29b-41d4-a716-446655440002', 'Product Strategy', 'Expert', 'Business'),
('550e8400-e29b-41d4-a716-446655440002', 'Analytics', 'Advanced', 'Technical'),
('550e8400-e29b-41d4-a716-446655440002', 'Agile', 'Expert', 'Methodology');

-- Insert sample career insights
INSERT INTO career_insights (user_id, insight_type, title, content, data) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Market Trends', 'JavaScript Frameworks in High Demand', 'React and Vue.js continue to dominate the job market with 25% growth in job postings this quarter.', '{"growth_rate": 25, "top_frameworks": ["React", "Vue.js", "Angular"]}'),
('550e8400-e29b-41d4-a716-446655440000', 'Salary', 'Software Engineer Salary Trends', 'Average salary for Senior Software Engineers in San Francisco has increased by 8% to $125,000.', '{"avg_salary": 125000, "growth": 8, "location": "San Francisco"}'),
('550e8400-e29b-41d4-a716-446655440001', 'Skills Gap', 'Machine Learning Skills Recommendation', 'Consider learning MLOps and model deployment to increase your market value by 30%.', '{"recommended_skills": ["MLOps", "Model Deployment", "Kubernetes"], "value_increase": 30}');
