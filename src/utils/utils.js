export function imageFolder(folderName, imageUrl) {
    const defaultUrl = "https://storage.googleapis.com/companion-ai-bucket/images/q0hGs7GT9E2YMyaXpXJWOd8b.png";

    // Check if folderName is not provided or if it's not in a valid format
    if(!folderName || !folderName.trim() || imageUrl.indexOf("images") === -1) {
        return defaultUrl;
    }

    // Ensure folderName ends with a "/"
    if(!folderName.endsWith('/')) {
        folderName += '/';
    }

    // Split the URL by "/"
    const parts = imageUrl.split('/');

    // Find the index of "images" in the URL
    const imageIndex = parts.findIndex(part => part === "images");

    // Insert the folder name after "images" and rejoin the URL parts into a single string
    parts.splice(imageIndex + 1, 0, folderName);
    return parts.join('/');
}
