console.log("highlighting text triggered")

async function getKeywords() {
    var form_data = new FormData();
    form_data.append("url", window.location.href)

    const loader = document.createElement("p")
    let articlebody = document.getElementById("article-body")
    loader.id = "loader"
    loader.innerHTML = "Crunching Highlights..."
    loader.style.border = "1px solid black"
    loader.style.borderRadius = "20px"
    loader.style.padding = "10px"
    loader.style.textAlign = "center"
    articlebody.prepend(loader)

    let content = JSON.stringify(document.getElementsByTagName("html")[0])
    // console.log(document.getElementsByTagName("html")[0].innerHTML)

    await fetch("http://127.0.0.1:5000/api", {
        method: "POST",
        redirect: 'follow',
        body: form_data
    })
    .then(response => {
        console.log("result parsed!");
        return response.text()
    })
    .then(data => {
        var result = JSON.parse(data) // comment if taking input as the whole website
        console.log(result)
        for (position in result) {
            document.getElementById("article-body").innerHTML = 
            document.getElementById("article-body").innerHTML
            .replaceAll(result[position], 
                "<span style='color: red; font-weight: bold'>" + result[position] + "</span>")
        }
            // document.getElementsByTagName("html")[0].innerHTML = 
            // document.getElementsByTagName("html")[0].innerHTML
            // .replace(document.getElementsByTagName("html")[0].innerHTML, 
            //     data)
    })

    document.getElementById("loader").style.display = 'none'
}

getKeywords()