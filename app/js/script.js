const dailyBtn = document.querySelector(".daily");
const weeklyBtn = document.querySelector(".weekly");
const monthlyBtn = document.querySelector(".monthly");
const current = document.querySelectorAll(
  ".hero__container__statistics__card__info__details__current"
);
const previous = document.querySelectorAll(
  ".hero__container__statistics__card__info__details__previous"
);

dailyBtn.addEventListener("click", () => {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      current.forEach((value, index) => {
        value.innerHTML = `${data[index].timeframes.daily.current}hrs`;
      });

      previous.forEach((value, index) => {
        value.innerHTML = `Last week - ${data[index].timeframes.daily.previous}hrs`;
      });
    });

  dailyBtn.style.color = "white";
  weeklyBtn.style.color = "var(--pale-blue)";
  monthlyBtn.style.color = "var(--pale-blue)";
});

weeklyBtn.addEventListener("click", () => {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      current.forEach((value, index) => {
        value.innerHTML = `${data[index].timeframes.weekly.current}hrs`;
      });

      previous.forEach((value, index) => {
        value.innerHTML = `Last week - ${data[index].timeframes.weekly.previous}hrs`;
      });
    });

  dailyBtn.style.color = "var(--pale-blue)";
  weeklyBtn.style.color = "white";
  monthlyBtn.style.color = "var(--pale-blue)";
});

monthlyBtn.addEventListener("click", () => {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      current.forEach((value, index) => {
        value.innerHTML = `${data[index].timeframes.monthly.current}hrs`;
      });

      previous.forEach((value, index) => {
        value.innerHTML = `Last week - ${data[index].timeframes.monthly.previous}hrs`;
      });
    });

  dailyBtn.style.color = "var(--pale-blue)";
  weeklyBtn.style.color = "var(--pale-blue)";
  monthlyBtn.style.color = "white";
});
