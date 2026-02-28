async function generateResponse() {
  const prompt = document.getElementById("prompt").value;
  const responseDiv = document.getElementById("response");
  const loader = document.getElementById("loader");

  responseDiv.classList.add("hidden");
  loader.classList.remove("hidden");

  const res = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  loader.classList.add("hidden");
  responseDiv.classList.remove("hidden");

  typeEffect(data.reply, responseDiv);
}

function typeEffect(text, element) {
  element.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 20);
    }
  }

  typing();
}