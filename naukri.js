const cheerio = require('cheerio')
const request = require('request')
const axios = require('axios')
const dataUrl = "https://www.naukri.com/bank-jobs?qf"
var linkArr = []
const fetchData = async (siteUrl) => {
    // console.log("url", siteUrl)
    try {
        const result = await axios.get(siteUrl);
        return cheerio.load(result.data);
    } catch (Err) { console.log(Err) }
};

const browseJob = async (link) => {
    // console.log("browse", link)
    console.log("browse", link[54])
    let site = await link[54]
    await axios.get(site)
        .then((res) => {
            // console.log(res.data)
            const $ = cheerio.load(res.data)
            const text = $('.list').html()
            console.log(text)
        })
        .catch(err => console.log("err"))
    // const $ = await fetchData(site);
    // const text = $('.headGNBWrap').html()
    // console.log(text)
    // $('.list').each(async (i, el) => {
    //     const output = $(el).find('.jobTuple')
    //     const link = $(output).find('.info a').attr('href')
    //     // const link = $(el).attr('href')
    //     console.log(link)
    //     // linkArr.push(link)
    // })

}

const getResults = async () => {
    try {
        let site = "https://www.naukri.com/top-skill-jobs#topJobsSection";
        const $ = await fetchData(site);
        $('.multiColumn a').each(async (i, el) => {
            const output = $(el).text()
            const link = $(el).attr('href')
            linkArr.push(link)
        })
        await browseJob(linkArr)
    } catch (err) { console.log("first error") }
}
getResults()

