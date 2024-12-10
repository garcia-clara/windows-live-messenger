import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Generate the Discord OAuth URL
export const getDiscordAuthUrl = () => {
  return `https://discord.com/oauth2/authorize?client_id=${
    import.meta.env.VITE_DISCORD_CLIENT_ID
  }&response_type=code&redirect_uri=${encodeURIComponent(
    import.meta.env.VITE_DISCORD_REDIRECT_URI
  )}&scope=${import.meta.env.VITE_DISCORD_SCOPE}`;
};

// Fetch the Discord OAuth token
export const fetchDiscordToken = async (code) => {
  const data = new URLSearchParams();
  data.append("client_id", import.meta.env.VITE_DISCORD_CLIENT_ID);
  data.append("client_secret", import.meta.env.VITE_DISCORD_CLIENT_SECRET);
  data.append("grant_type", "authorization_code");
  data.append("code", code);
  data.append("redirect_uri", import.meta.env.VITE_DISCORD_REDIRECT_URI);

  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    const token = response.data.access_token;
    localStorage.setItem("discord_token", token); // Save the token
    return token;
  } catch (error) {
    console.error(
      "Failed to fetch Discord token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch Discord token");
  }
};

// Fetch user data from Discord
export const fetchDiscordUserData = async (token) => {
  try {
    const response = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = response.data;

    return userData;
  } catch (error) {
    console.error(
      "Failed to fetch Discord user data:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch Discord user data");
  }
};

// Central function to authenticate with Discord
export const authenticateWithDiscord = async (code) => {
  const token = await fetchDiscordToken(code);
  const userData = await fetchDiscordUserData(token);
  return userData;
};

// DiscordAuthHandler Component
export const DiscordAuthHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      authenticateWithDiscord(code)
        .then((userData) => {
          console.log("Discord authentication successful:", userData);
          navigate("/");
        })
        .catch((error) => {
          console.error("Discord authentication failed:", error.message);
          navigate("/login");
        });
    } else {
      console.error("No code found in URL");
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return <div>Authenticating with Discord...</div>;
};
