const urlRegex = /(https?:\/\/\S+)/g;

export const getUrlandText=(textWithUrls)=>
{
const urls = [];
let textWithoutUrls = textWithUrls;

textWithUrls.replace(urlRegex, (match) => {
    urls.push(match);
    textWithoutUrls = textWithoutUrls.replace(match, ""); // Remove the URL from the text
});



return {textWithoutUrls,urls};
}