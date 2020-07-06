import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import LazyLoad from 'react-lazyload';

export const Home = () => {

    const dispatch = useDispatch()
    const allContents = useSelector(state => state ? state.contents : [])

    const [contents, setContents] = useState(allContents)

    const jsonData = require('../API/CONTENTLISTINGPAGE-PAGE1.json')

    let arr = []
    arr.push(jsonData)

    if (!allContents.JSONData || !allContents.JSONData.length) {
        dispatch({ type: 'Update_Result', payload: { JSONData: arr } })
    }



    async function search(e) {
        try {
            let value = e.target.value;

            let allValue = JSON.parse(JSON.stringify(allContents))//Object.assign({}, allContents)

            let regex = new RegExp(value.toLowerCase());
            let filtered = await Promise.all(allValue.JSONData.filter(ele => {
                let ele2 = ele.page['content-items'].content.filter(content => {
                    if (content.name.toLowerCase().match(regex)) {
                        return content;
                    }
                })
                let newEle = ele
                newEle['page']['content-items']['content'] = ele2;
                return newEle
            })
            )

            setContents({ JSONData: filtered })
        }
        catch (e) {
            console.log(e)
        }
    }



    function scrolled() {
        let element = document.getElementById('contents-div')
        let top = element.scrollTop
        let height = element.scrollHeight
        let currentHeight = element.clientHeight
        let bottom = top / (height - currentHeight)

        if (bottom === 1) {
            try {
                console.log(allContents, 'all Contents')
                let pageData = allContents.JSONData
                let page = pageData[pageData.length - 1].page['page-num-requested']
                console.log(page)
                let data = require(`../API/CONTENTLISTINGPAGE-PAGE${parseInt(page) + 1}.json`)
                console.log(data)
                pageData.push(data)
                console.log(pageData)
                dispatch({ type: 'Update_Result', payload: { JSONData: pageData } })
                setContents(allContents)
            }
            catch (e) {
                console.log(e)
            }

        }

    }

    const imageError = (e) => {
       try{
           e.target.src = 'placeholder.jpg';
       }
       catch(e){
           console.log(e)
       }
    }

    return (
        <>
            <div className="header">
                <img src="Slices/Back.png" className="back" />
                {contents.JSONData ? <p>{contents.JSONData[0].page.title}</p> : null}
                <div className="search-box">
                    <input type="text" className="search-txt" placeholder="Search..." onChange={search} />
                    <img src="Slices/search.png" className="search" />
                </div>

            </div>
            <div className="contents" onScroll={scrolled} id="contents-div">
                {contents.JSONData ?
                    <div className="grid grid-cols-3 gap-2" key={'sdlk'}>
                        {contents.JSONData.map((item, i) => (

                            item.page['content-items'].content.map((ele, j) => (
                                <div className="col-span-1" key={item.page['page-num-requested'] + j} >
                                    {/* <LazyLoad once > */}
                                    <img src={"Slices/" + ele["poster-image"]} onError={imageError} style={{height :'200px' , width :'233px'}} />
                                    {/* </LazyLoad> */}
                                    <p>{ele.name}</p>
                                </div>
                            ))


                        ))}
                    </div> : null}
            </div>
        </>
    )
}
