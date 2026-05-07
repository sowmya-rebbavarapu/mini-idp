function validatePorts(port) {

  const allowedPorts = [3000];

  if (!allowedPorts.includes(port)) {

    return {
      valid: false,
      message:
        "❌ Only approved application ports are allowed"
    };
  }

  return {
    valid: true
  };
}

module.exports = validatePorts;