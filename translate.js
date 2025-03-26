async function translateText() {
    const text = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputText");
  
    try {
      const response = await fetch("http://localhost:8080/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          source_lang: "auto", 
          target_lang: "PT",
        })
      });
  
      const data = await response.json();
  
      if (data.code === 200) {
        outputText.value = data.data;
      } else {
        outputText.value = "Error in translating: " + data.msg;
      }
    } catch (error) {
      console.error("Error in translating: ", error);
      outputText.value = "Error in translating. Try again.";
    }
  }
  