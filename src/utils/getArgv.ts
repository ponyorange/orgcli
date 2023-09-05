module.exports = function getArgv(com: string): string[] {
  const args = process.argv;
  if (args.length === 2) {
    return [args[0], args[1], "help"];
  } else {
    let wordStr = "";
    for (let i = 2; i < args.length; i++) {
      wordStr = wordStr + args[i] + " ";
    }
    return [args[0], args[1], com, wordStr.trim()];
  }
};

export default void 0;
