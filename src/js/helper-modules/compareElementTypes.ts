function compareElementTypes(type: unknown, ...elems: unknown[]) {
  return elems.includes(type, 0);
}

export default compareElementTypes;