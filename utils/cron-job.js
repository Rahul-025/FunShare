const FileModel = require("../models/file-model");

// const cronJob = async () => {
//   const pastDate = new Date(Date.now() - 8 * 60 * 60);
//   const files = await FileModel.find({ createdAt: { $lte: pastDate } });

//   const len = files.length;
//   if (!len) {
//     return;
//   }
//   console.log(`Removing ${len} files...`);
//   for (const file of files) {
//     try {
//       fs.unlinkSync(file.path);
//       await file.remove();
//       console.log(`successfully removed ${file.name}`);
//     } catch (error) {
//       console.log(`Error removing file: ${file.name} - ${err.message}`);
//     }
//   }

//   console.log(`successfully removed all files`);
// };

const cronJob = () => {
  const pastDate = new Date(Date.now() - 8 * 60 * 60);
  const files = FileModel.find({ createdAt: { $lte: pastDate } })
    .then(() => {
      const len = files.length;
      if (!len) {
        return;
      }
      console.log(`Removing ${len} files...`);
      for (const file of files) {
        fs.unlinkSync(file.path);
        file
          .remove()
          .then(() => console.log(`successfully removed ${file.name}`));
      }
    })
    .catch((err) => {
      console.log(`Error removing file: ${err.message}`);
    });

  console.log(`successfully removed all files`);
};

const s = async () => {
  setTimeout(() => console.log("wrra"), 2000);
};

module.exports = cronJob;
