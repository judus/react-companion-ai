export function imageFolder(folderName, imageUrl) {
    const baseUrl = "https://storage.googleapis.com/companion-ai-bucket/images/";
    const defaultUrl = "https://storage.googleapis.com/companion-ai-bucket/images/q0hGs7GT9E2YMyaXpXJWOd8b.png";

    // Check if imageUrl is valid and contains 'images'
    if(!imageUrl || imageUrl.indexOf("images") === -1) {
        return defaultUrl;
    }

    // Check if folderName is not provided or if it's not in a valid format
    if(!folderName || !folderName.trim()) {
        return imageUrl;
    }

    // Ensure folderName does not start or end with a "/"
    folderName = folderName.replace(/^\/+|\/+$/g, '');

    // Replace the base URL with the base URL + folderName + "/"
    return imageUrl.replace(baseUrl, `${baseUrl}${folderName}/`);
}