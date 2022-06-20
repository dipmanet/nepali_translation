const translate = require('@iamtraction/google-translate');
const fs = require('fs')
const util = require('util')
const docdata = require('./translation')


const nepaliTranslation = async()=>{
    let doc = docdata;

    for(const dataset of doc){
        for(let p of dataset.data){
            let temp = 'a'
            await translate(p.value, { from: 'en', to: 'ne' }).then(res => {
                temp=res.text;
            }).catch(err => {
                console.error(err);
            });
            p.valueNe = temp
        }
    }
    fs.writeFileSync('translated.js', 'const resourceHeader = ' + JSON.stringify(doc) , (err)=>{
        if(err) throw err;
        console.log('File Saved')
    })
}

nepaliTranslation()