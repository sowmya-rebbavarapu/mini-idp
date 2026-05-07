function validateRepo(repoUrl) {

  // Allow only GitHub repos
  if (!repoUrl.includes("github.com")) {

    return {
      valid: false,
      message: "❌ Only GitHub repositories are allowed"
    };
  }

  // Allow only HTTPS repos
  if (!repoUrl.startsWith("https://")) {

    return {
      valid: false,
      message: "❌ Repository must use HTTPS"
    };
  }

  return {
    valid: true
  };
}

module.exports = validateRepo;