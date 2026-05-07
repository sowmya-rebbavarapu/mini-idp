const { execSync } = require("child_process");

function validateDockerfile(repoPath) {

  try {

    execSync(`test -f ${repoPath}/Dockerfile`);

    return {
      valid: true
    };

  } catch {

    return {
      valid: false,
      message: "❌ Dockerfile missing"
    };
  }
}

module.exports = validateDockerfile;