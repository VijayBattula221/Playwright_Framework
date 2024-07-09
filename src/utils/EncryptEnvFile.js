// const CryptoJSUtilFile = require("crypto-js");
// const fs = require("fs");
// const path = require("path");

// const currentDir = __dirname;
// // Go one level above (back to 'src')
// const srcDir = path.resolve(currentDir, "..");

// // Change to 'config' folder
// const configDir = path.resolve(srcDir, "config");
// let envFilePath = `${configDir}\\.env`;
// if (process.env.NODE_ENV) {
//   envFilePath = `${configDir}\\.env.${process.env.NODE_ENV}`;
// }

// console.log(envFilePath);

// export function encryptEnvFile() {
//   const SALT = process.env.SALT || "defaultSALT";
//   // Read the .env file
//   const envFileContent = fs.readFileSync(envFilePath, "utf8");
//   const envLines = envFileContent.split("\n");

//   // Encrypt values and update the array
//   const encryptedLines = envLines.map((line) => {
//     if (line.startsWith("Encrypted=")) {
//       return line; // Skip the Encrypted line itself
//     }
//     const [key, value] = line.split("=");

//     if (value) {
//       const encryptedValue = CryptoJSUtilFile.AES.encrypt(
//         value,
//         SALT,
//       ).toString();
//       return `${key}=${encryptedValue}`;
//     }
//     return line;
//   });
//   // Join the lines and write back to the .env file
//   const updatedEnvContent = encryptedLines.join("\n");
//   fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

//   console.log("Encryption complete. Updated .env file.");
// }
// export function decryptEnvFile() {
//   const SALT = process.env.SALT || "defaultSALT";

//   // Read the .env file
//   const envFileContent = fs.readFileSync(envFilePath, "utf8");
//   const envLines = envFileContent.split("\n");

//   // Encrypt values and update the array
//   const decryptedLines = envLines.map((line) => {
//     if (line.startsWith("Encrypted=")) {
//       return line; // Skip the Encrypted line itself
//     }
//     const [key, value] = line.split("=");

//     if (value) {
//       const decryptedValue = CryptoJSUtilFile.AES.decrypt(value, SALT).toString(
//         CryptoJSUtilFile.enc.Utf8,
//       );
//       return `${key}=${decryptedValue}`;
//     }
//     return line;
//   });

//   // Join the lines and write back to the .env file
//   const updatedEnvContent = decryptedLines.join("\n");
//   fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

//   console.log("Decryption complete. Updated .env file.");
// }



// // Function to handle encryption/decryption based on Encrypted flag

// export function handleEncryption() {
//   const isEncrypted = process.env.Encrypted === "true";

//   if (isEncrypted) {
//     decryptEnvFile();
//   } else {
//     encryptEnvFile();
//   }
// }
const CryptoJS = require("crypto-js");
const fs = require("fs");
const path = require("path");

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const configDir = path.resolve(srcDir, "config");

let envFilePath = `${configDir}\\.env`;
if (process.env.NODE_ENV) {
  envFilePath = `${configDir}\\.env.${process.env.NODE_ENV}`;
}

export function isEncrypted(value, SALT) {
  try {
    const decryptedValue = CryptoJS.AES.decrypt(value, SALT).toString(CryptoJS.enc.Utf8);
    return decryptedValue !== ""; // If decryption yields a non-empty string, it was encrypted
  } catch (error) {
    return false; // If decryption fails, it was not encrypted
  }
}

export function encryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";

  try {
    // Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    // Encrypt values and update the array
    const encryptedLines = envLines.map((line) => {
      if (line.startsWith("Encrypted=")) {
        return "Encrypted=true"; // Set Encrypted to true
      }

      const [key, value] = line.split("=");

      if (value) {
        const encryptedValue = CryptoJS.AES.encrypt(value, SALT).toString();
        return `${key}=${encryptedValue}`;
      }
      return line;
    });

    // Join the lines and write back to the .env file
    const updatedEnvContent = encryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

    console.log("Encryption complete. Updated .env file.");
  } catch (error) {
    console.error("Error encrypting .env file:", error);
  }
}

export function decryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";

  try {
    // Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    // Decrypt values and update the array
    const decryptedLines = envLines.map((line) => {
      if (line.startsWith("Encrypted=")) {
        return "Encrypted=false"; // Set Encrypted to false
      }

      const [key, value] = line.split("=");

      if (value) {
        const decryptedValue = CryptoJS.AES.decrypt(value, SALT).toString(CryptoJS.enc.Utf8);
        return `${key}=${decryptedValue}`;
      }
      return line;
    });

    // Join the lines and write back to the .env file
    const updatedEnvContent = decryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

    console.log("Decryption complete. Updated .env file.");
  } catch (error) {
    console.error("Error decrypting .env file:", error);
  }
}

// Function to handle encryption/decryption based on Encrypted flag
export function handleEncryption() {
  const SALT = process.env.SALT || "defaultSALT";
  let envFileContent = fs.readFileSync(envFilePath, "utf8");
  const isEncryptedFlagSet = envFileContent.includes("Encrypted=true");
  const isDecryptedFlagSet = envFileContent.includes("Encrypted=false");

  if (isEncryptedFlagSet) {
    decryptEnvFile();
  } else if (isDecryptedFlagSet) {
    // Check if the values are actually encrypted
    const envLines = envFileContent.split("\n");
    const isActuallyEncrypted = envLines.some((line) => {
      const [key, value] = line.split("=");
      return key && value && isEncrypted(value, SALT);
    });

    if (isActuallyEncrypted) {
      console.log("Values are already encrypted. No action needed.");
    } else {
      encryptEnvFile();
    }
  } else {
    console.log("Encrypted flag is not set. No action taken.");
  }
}

