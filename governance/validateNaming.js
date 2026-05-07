function validateNaming(repoUrl) {

  const repoName =
    repoUrl.split("/").pop().replace(".git", "");

  const regex = /^[a-z0-9-]+$/;

  if (!regex.test(repoName)) {

    return {
      valid: false,
      message:
        "❌ Repository name must use lowercase letters and hyphens only"
    };
  }

  return {
    valid: true
  };
}

module.exports = validateNaming;