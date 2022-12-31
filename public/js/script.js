const dropbox = document.querySelector(".dropbox");
const dropboxUpper = document.querySelector(".dropbox-upper");
const fileInput = document.querySelector(".file-input");
const browseFilesBtn = document.querySelector(".browse-files-btn");

// Progress elements

const progressContainer = document.querySelector(".progress-container");
const progressPercentContainer = document.querySelector(
  ".progress-percent-container"
);
const progressPercentSpan = document.querySelector(".progress-percent");
const progressBar = document.querySelector(".progress-bar");

// Sharing Elements
const sharingContainer = document.querySelector(".sharing-container");
const urlInput = document.querySelector(".sharing_container__upper-input");
const copyIcon = document.querySelector(".copy-icon");

// Form Elements
const emailForm = document.querySelector(".email-form");
const emailFromInput = document.querySelector("#email-from");
const emailToInput = document.querySelector("#email-to");
const emailSubmitBtn = document.querySelector(".send-email-btn");

const toastContainer = document.querySelector(".toast");

// API Links
const API_URL = "https://funshare.onrender.com";
const UPLOAD_LINK = `${API_URL}/api/files`;
const EMAIL_LINK = `${API_URL}/api/files/sendemail`;

// Constants
const SUCCESS_COLOR = "#198754";
const ERROR_COLOR = "#ff0033";
const MAX_ALLOED_SIZE = 1024 * 1024 * 100;

//
browseFilesBtn.addEventListener("click", (e) => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  upload();
});

copyIcon.addEventListener("click", () => {
  urlInput.select();
  navigator.clipboard.writeText(urlInput.value);
  handleToast({ bgColor: SUCCESS_COLOR, text: "Link copied to clipboard" });
});

// Dragging events
dropbox.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!dropbox.classList.contains("dragged")) {
    dropbox.classList.add("dragged");
  }
});

dropbox.addEventListener("dragleave", () => {
  dropbox.classList.remove("dragged");
});

dropbox.addEventListener("drop", (e) => {
  e.preventDefault();
  const droppedFiles = e.dataTransfer.files;

  if (droppedFiles.length) {
    fileInput.files = droppedFiles;
  }
  dropbox.classList.remove("dragged");

  // upload file
  upload();
});

// reset input function
const resetFileInput = () => {
  fileInput.value = "";
};

const upload = () => {
  if (fileInput.files.length > 1) {
    handleToast({ bgColor: ERROR_COLOR, text: "Only 1 upload allowed!" });
    resetFileInput();
    return;
  }
  const file = fileInput.files[0];

  if (file.size > MAX_ALLOED_SIZE) {
    handleToast({ bgColor: ERROR_COLOR, text: "Upload upto 100mb only!" });
    resetFileInput();
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      onUploadSuccess(JSON.parse(xhr.response));
      handleToast({ bgColor: SUCCESS_COLOR, text: "File uploaded" });
    }
  };
  xhr.upload.onprogress = (e) => {
    const uploadPercent = Math.round((e.loaded / e.total) * 100);
    progressContainer.style.display = "block";
    progressBar.style.width = `${uploadPercent}%`;
    progressPercentContainer.style.display = "flex";
    progressPercentContainer.style.marginLeft = `${Math.max(
      5,
      uploadPercent - 22
    )}%`;
    progressPercentSpan.innerText = `${uploadPercent}%`;
  };

  xhr.onerror = () => {
    handleToast({ bgColor: ERROR_COLOR, text: "Upload failed :(" });
  };

  xhr.open("POST", UPLOAD_LINK, true);
  xhr.send(formData);
};

const onUploadSuccess = ({ downloadPage }) => {
  progressContainer.style.display = "none";
  dropboxUpper.style.display = "none";
  sharingContainer.style.display = "flex";
  urlInput.value = downloadPage;
  fileInput.value = "";
};

// Handle Form Submit
emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Before sending email check if it is already sent.
  if (emailSubmitBtn.classList.contains("sent")) {
    handleToast({ bgColor: ERROR_COLOR, text: "Email already sent!" });
    return;
  }

  const fileId = urlInput.value.split("/").splice(-1, 1)[0];
  const emailFrom = emailFromInput.value;
  const emailTo = emailToInput.value;
  const formData = {
    fileId,
    emailFrom,
    emailTo,
  };

  // Check if input is empty
  if (!emailFrom || !emailTo) {
    handleToast({ bgColor: ERROR_COLOR, text: "All fields are required!" });
    return;
  }
  const success = sendEmail(formData);
  if (success) {
    emailSubmitBtn.classList.add("sent");
  }
});

// Send Email Logic
const sendEmail = (formData) => {
  fetch(EMAIL_LINK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success === true) {
        handleToast({ bgColor: SUCCESS_COLOR, text: "Email Sent!" });
        return true;
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      handleToast({ bgColor: ERROR_COLOR, text: error.message });
      return false;
    });
};

// Toast logic
let toastIntervel;
const handleToast = ({ bgColor, text }) => {
  toastContainer.style.display = "flex";
  toastContainer.style.backgroundColor = bgColor;
  toastContainer.innerText = text;

  // Toast Animation
  gsap.fromTo(
    toastContainer,
    {
      y: "-500px",
      opacity: 0,
      scale: 0,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back",
    }
  );

  clearTimeout(toastIntervel);
  toastIntervel = setTimeout(() => {
    toastContainer.style.display = "none";
  }, 4000);
};
