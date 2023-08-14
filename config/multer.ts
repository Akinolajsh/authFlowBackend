import multer from "multer";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

// for signing Up

export const upload = multer({ storage: storage }).single("avatar");

// for creating an article
export const image = multer({ storage: storage }).single("image");
