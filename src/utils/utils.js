export function imageFolder(folderName, imageUrl) {
    // Split the URL by "/"
    const parts = imageUrl.split('/');

    // Find the index of "images" in the URL
    const imageIndex = parts.findIndex(part => part === "images");

    // Insert the folder name after "images"
    parts.splice(imageIndex + 1, 0, folderName);

    // Rejoin the URL parts into a single string
    return parts.join('/');
}