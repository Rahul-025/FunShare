const showEmailBtn = document.querySelector(".email-btn");
const sharingUpper = document.querySelector(".sharing-container__upper");
const sharingLower = document.querySelector(".sharing-container__lower");

const backBtn = document.querySelector(".back-btn");
const sendEmailBtn = document.querySelector(".send-email-btn");

showEmailBtn.addEventListener("click", () => {
  sharingUpper.style.display = "none";

  sharingLower.style.display = "flex";

  gsap.fromTo(
    sharingLower,
    {
      x: "200px",
      duration: 0.5,
    },
    {
      x: 0,
      duration: 0.5,
      ease: "back",
    }
  );

  gsap.fromTo(
    sharingLower,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2,
    }
  );

  gsap.fromTo(
    backBtn,
    {
      x: "-50px",
      opacity: 0,
    },
    {
      opacity: 1,
      x: 0,
    }
  );

  gsap.to(sendEmailBtn, {
    opacity: 1,
    delay: 0.5,
  });
});

backBtn.addEventListener("click", () => {
  sharingUpper.style.display = "flex";

  sharingLower.style.display = "none";

  gsap.fromTo(
    sharingUpper,
    {
      x: "-200px",
      duration: 0.5,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: "back",
    }
  );

  gsap.fromTo(sharingUpper, { opacity: 0 }, { opacity: 1, duration: 2 });
});
