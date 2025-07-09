
// This service simulates AI newsletter generation
// In a real implementation, this would call Google's Gemini API or similar AI service

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const generateImageSection = async (images: File[]): Promise<string> => {
  if (images.length === 0) return '';

  const imagePromises = images.map(async (image) => {
    const base64 = await convertImageToBase64(image);
    return `<img src="${base64}" alt="${image.name}" style="max-width: 300px; height: auto; margin: 10px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />`;
  });

  const imageElements = await Promise.all(imagePromises);
  
  return `
    <div class="images-section" style="text-align: center; margin: 30px 0;">
      <h3 style="color: #333; margin-bottom: 20px; font-size: 1.2em;">📸 Newsletter Highlights</h3>
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">
        ${imageElements.join('')}
      </div>
    </div>
  `;
};

export const generateNewsletter = async (rawInput: string, images: File[] = []): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const imageSection = await generateImageSection(images);
  
  // Enhanced logo integration
  const logoUrl = "https://via.placeholder.com/200x80/007bff/ffffff?text=NEUREALM";
  
  const mockNewsletter = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neurealm Newsletter - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; background-color: #f8f9fa; }
        .container { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
        .header { text-align: center; background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px 20px; }
        .logo { max-width: 200px; height: auto; margin-bottom: 15px; }
        .header h1 { margin: 0; font-size: 2.2em; font-weight: bold; }
        .header p { margin: 10px 0 0; opacity: 0.9; font-size: 1.1em; }
        .content { padding: 30px; }
        .section { margin-bottom: 35px; }
        .section h2 { color: #333; border-left: 4px solid #007bff; padding-left: 15px; margin-bottom: 15px; font-size: 1.4em; }
        .achievements { background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #28a745; }
        .footer { text-align: center; background: #343a40; color: white; padding: 25px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        .highlight-box { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196f3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${logoUrl}" alt="Neurealm Logo" class="logo" />
            <h1>Company Newsletter</h1>
            <p>${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Edition</p>
            <p>Hello Neuronauts! Welcome to this month's internal newsletter.</p>
        </div>

        <div class="content">
            <div class="section">
                <h2>📌 Key Highlights</h2>
                <div class="highlight-box">
                    <p>We're excited to share the latest updates, achievements, and upcoming events from across our organization. This month has been filled with remarkable progress and team collaboration.</p>
                </div>
            </div>

            ${imageSection}

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
        </div>

        <div class="footer">
            <img src="${logoUrl}" alt="Neurealm Logo" style="max-width: 150px; height: auto; margin-bottom: 15px; opacity: 0.8;" />
            <p>&copy; ${new Date().getFullYear()} Neurealm. All rights reserved.</p>
            <p style="font-size: 0.9em; opacity: 0.8;"><em>This newsletter was generated automatically from departmental updates. For questions or suggestions, please contact the HR team.</em></p>
        </div>
    </div>
</body>
</html>`;

  return mockNewsletter;
};

// Function to integrate with actual AI API (like Google Gemini)
export const generateNewsletterWithAI = async (rawInput: string, apiKey?: string, images: File[] = []): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key required for AI generation');
  }

  const imageSection = await generateImageSection(images);
  const logoUrl = "https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEXxsdaLLnMPLGYM5E6Lt3Zlte0NlE4VB3Ml38itZuKa05Z4NkyJyhYaNFMYi74QW9HZbHyy8vT9KzmyvOnUN0uganO9MEPWxxFug9d46aC5xn0JvF5kakdAWXwenf4Pg6G0JrHGVQ9J%2FNo30PtQgPUtVaz%2BA%2BYU5SFrkWmNDsE2R0LPw%2BrLoW%2BPnmtmyRo%2FlLm4jzpCEdGUJBphTgembBNPkdCaPPkpOZnkTsqoXH03CRyM35PWhW2PcysSqUQzQBfJuIL6ALyjpVF7pDemF2pdwGiTihOaSgmFpwMiambqQiIDB%2F2dm4Yd6TK6oO%2FJ5FqHGh6zWz1zctwzfVd82PSkXEJWyitoTUdGKXigufG3G8ynf6s7LATFyasrpPi0wVxesyc416MireqQRtkonKT%2FMaWxUVrew%2BBLU5Xdo6itJZNYmCBQb6WTEPhW4eYVOW9vArscqjDVtfE%2B%2BWCdYvpe9mf4pJUqFzKzBDMM5JDEGwDUiwvwKNiALoty4T9J%2FkQKIK%2FibWPT99mgzf2GTy%2FXnrJElYcNlK9w1bB%2B88yVgtrSQhvTUBL2fyYpt2A%3D&allow_caching=true&sz=w1920-h912";

  const prompt = `
  You are an expert communication writer helping HR generate internal newsletters for Neurealm.

  Take the following raw departmental notes and generate a structured, engaging newsletter in very professional format:

  ${rawInput}

  Requirements:
  - Use "Neuronauts" as the greeting term for employees
  - Use "Neurealm" as the organization name throughout
  - Include a header with company logo (use this URL: ${logoUrl}) and newsletter title
  - Include the following image section after Key Highlights: ${imageSection}
  - Organize content into logical sections with these headers:
    • 📌 Key Highlights
    • 🏆 Team Achievements  
    • 📣 Announcements
    • 📅 Upcoming Events
  - Add a footer with logo, copyright notice and generation note
  - Use inline CSS for professional styling with modern design
  - Use a friendly but professional tone suitable for company-wide internal audience
  - Improve grammar, clarity, and formatting

  Make it visually appealing with proper spacing, colors, and typography. Use gradients and modern styling.
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
    return generateNewsletter(rawInput, images);
  }
};
