import { fetchDiscordToken, fetchDiscordUserData } from "./discordAuth";

export const isAuthenticated = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  return email && password;
};

export const isDiscordAuthenticated = () => {
  const token = localStorage.getItem("discord_token");
  return !!token;
};

export const saveDiscordUserData = (userData) => {
  localStorage.setItem("discord_id", userData.id);
  localStorage.setItem("discord_username", userData.global_name);
  localStorage.setItem("discord_email", userData.email || "N/A");
  localStorage.setItem("discord_avatar", userData.avatar || "default_avatar.png");
  localStorage.setItem("message", "")
};

export const getDiscordUserData = () => {
  const data = localStorage.getItem("discord_user_data");
  return data ? JSON.parse(data) : null;
};

export const authenticateWithDiscord = async (code) => {
  const token = await fetchDiscordToken(code);
  const userData = await fetchDiscordUserData(token);
  saveDiscordUserData(userData);
  return userData;
};

export const logout = () => {
  localStorage.clear();
};
