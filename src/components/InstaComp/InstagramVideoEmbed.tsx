import React, { useState } from "react";

interface InstagramVideoEmbedProps {
  url: string;
}

const InstagramVideoEmbed: React.FC<InstagramVideoEmbedProps> = ({ url }) => {
  const [embedHtml, setEmbedHtml] = useState<string>("");
  const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your Facebook API token

  const fetchEmbed = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v17.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${accessToken}`
      );
      const data = await response.json();
      setEmbedHtml(data.html);
    } catch (error) {
      console.error("Error fetching Instagram embed:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchEmbed}>Load Instagram Post</button>
      <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
    </div>
  );
};

export default InstagramVideoEmbed;
