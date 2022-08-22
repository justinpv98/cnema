export function formatStringToPath(string) {
    //if input is a string, it converts the string into a pathfriendly format
  
    return typeof string === "string"
      ? string.toLowerCase().split(" ").join("-")
      : null;
  }

  export function formatRating(rating){
    //returns rating to the firt 
    return rating.toFixed(1)
  }
  
  export function toTitleCase(string) {
    //splits string if it has multiple words, and capitalizes the first character
    // accounts for TV being capitalized
  
    if (string === "tv-movie") {
      return "TV Movie";
    } else if (typeof string === "string") {
      let array = string.split("-");
      array = array.map((el) => el[0].toUpperCase() + el.substring(1, el.length));
      array = array.join(" ");
      return array;
    } else {
      return null;
    }
  }