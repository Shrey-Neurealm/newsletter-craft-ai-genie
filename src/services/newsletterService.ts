
// This service simulates AI newsletter generation
// In a real implementation, this would call Google's Gemini API or similar AI service

export const generateNewsletter = async (rawInput: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // This is a mock implementation that demonstrates the structure
  // In production, this would make an API call to Google's Gemini API
  
  const mockNewsletter = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neurealm Newsletter - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 2.5em; font-weight: bold; color: #007bff; margin-bottom: 10px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #333; border-left: 4px solid #007bff; padding-left: 15px; }
        .achievements { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .footer { text-align: center; border-top: 1px solid #dee2e6; padding-top: 20px; margin-top: 40px; color: #6c757d; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">NEUREALM</div>
        <h1>Company Newsletter - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h1>
        <p>Hello Neuronauts! Welcome to this month's internal newsletter.</p>
    </div>

    <div class="section">
        <h2>📌 Key Highlights</h2>
        <p>We're excited to share the latest updates, achievements, and upcoming events from across our organization. This month has been filled with remarkable progress and team collaboration.</p>
    </div>

    <div class="section achievements">
        <h2>🏆 Team Achievements</h2>
        <p>Our teams have been working hard and achieving great results:</p>
        <ul>
            <li><strong>Sales Excellence:</strong> Our sales team has exceeded expectations this quarter, demonstrating exceptional dedication and strategic thinking</li>
            <li><strong>Innovation Drive:</strong> The engineering team has successfully delivered multiple feature enhancements that improve user experience</li>
            <li><strong>Marketing Success:</strong> Our marketing initiatives have generated significant engagement and positive brand visibility</li>
            <li><strong>Operational Excellence:</strong> Various departments have streamlined processes and improved efficiency</li>
        </ul>
    </div>

    <div class="section">
        <h2>📣 Announcements</h2>
        <p><strong>Important Updates:</strong></p>
        <ul>
            <li>New policies and procedures have been implemented to enhance workplace efficiency</li>
            <li>Employee recognition programs are being expanded to celebrate team contributions</li>
            <li>Professional development opportunities are now available for skill enhancement</li>
            <li>Cross-departmental collaboration initiatives are being launched</li>
        </ul>
    </div>

    <div class="section">
        <h2>📅 Upcoming Events</h2>
        <p>Mark your calendars for these important dates:</p>
        <ul>
            <li><strong>Monthly All-Hands Meeting:</strong> Join us for company-wide updates and team spotlights</li>
            <li><strong>Professional Development Workshop:</strong> Skills training session for career growth</li>
            <li><strong>Team Building Activities:</strong> Fun events to strengthen interdepartmental relationships</li>
            <li><strong>Quarterly Review Sessions:</strong> Performance discussions and goal setting</li>
        </ul>
    </div>

    <div class="section">
        <h2>💡 Looking Ahead</h2>
        <p>We're committed to maintaining our momentum and continuing to build a positive, productive work environment. Thank you for your continued dedication and contributions to our shared success.</p>
    </div>

    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Neurealm. All rights reserved.</p>
        <p><em>This newsletter was generated automatically from departmental updates. For questions or suggestions, please contact the HR team.</em></p>
    </div>
</body>
</html>`;

  return mockNewsletter;
};

// Function to integrate with actual AI API (like Google Gemini)
export const generateNewsletterWithAI = async (rawInput: string, apiKey?: string): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key required for AI generation');
  }

  const prompt = `
  You are an expert communication writer helping HR generate internal newsletters for Neurealm.

  Take the following raw departmental notes and generate a structured, engaging newsletter in HTML format:

  ${rawInput}

  Requirements:
  - Use "Neuronauts" as the greeting term for employees
  - Use "Neurealm" as the organization name throughout
  - Create a complete HTML document with proper structure
  - Include a header with company logo/name and newsletter title
  - Organize content into logical sections with these headers:
    • 📌 Key Highlights
    • 🏆 Team Achievements  
    • 📣 Announcements
    • 📅 Upcoming Events
  - Add a footer with copyright notice and generation note
  - Use inline CSS for professional styling
  - Use a friendly but professional tone suitable for company-wide internal audience
  - Improve grammar, clarity, and formatting
  - Return a complete HTML document ready for viewing/emailing

  Make it visually appealing with proper spacing, colors, and typography.
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('AI generation error:', error);
    // Fallback to mock generation
    return generateNewsletter(rawInput);
  }
};
