function extractHashtags(text) {
  return [
    ...new Set(
      text
        .match(/#[a-zA-Z0-9_]+/g)
        ?.map(tag => tag.substring(1).toLowerCase()) || []
    )
  ];
}


export default extractHashtags;