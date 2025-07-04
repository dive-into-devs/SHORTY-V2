This is a full-stack web application built with Next.js (App Router), MongoDB, and NextAuth.
It allows users to shorten URLs, manage their links, and provides a powerful admin dashboard for user and link moderation.

🚀 Features
	•	User Registration & Authentication
Secure login/signup via email & password using NextAuth, with hashed passwords and session management.
	•	URL Shortening
Logged-in users can shorten any long URL and get a unique, shareable short link.
	•	Personal Dashboard
	•	View, search, edit, and delete your own short links
	•	See click counts for each link
	•	Admin Dashboard
	•	Search all users and all short URLs (by email or link)
	•	Delete or edit any short URL
	•	Ban/unban users to prevent login
	•	Only admins (marked via isAdmin in database) can access this dashboard
	•	Security Controls
	•	Prevent users from signing up with your own email domain (domain is set via environment variable)
	•	MongoDB connection IP whitelist support
	•	Sign Out
	•	Easy sign out for users from any page


  🛠️ Tech Stack
	•	Next.js (App Router)
	•	MongoDB (Mongoose)
	•	NextAuth (CredentialsProvider)
	•	Tailwind CSS (for modern UI)
	•	API Routes with App Router conventions
