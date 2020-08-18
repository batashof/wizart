import React, {useEffect} from 'react';
import '../../styles/styles.scss';
import Card from "../../components/card";
import {ReactComponent as Wizart} from './../../assets/wizart-grey.svg';
import {ReactComponent as Catalog} from './../../assets/catalog.svg';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Pagination from "@material-ui/lab/Pagination/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "../../components/button/button";
import {Article} from "../../types";

interface Props {
    readonly articles: Article[],
    readonly articlesLoading: boolean,
    readonly searchValue: string,
    readonly page: number
    readonly numOfPages: number
    getArticles: (page: number) => void,
    setArticlePage: (page: number) => void
}

const Main: React.FC<Props> = ({articles, getArticles, articlesLoading, searchValue, page,numOfPages, setArticlePage}) => {
    // const [sortArticles, setSortArticles] = React.useState(articles);
    const [sorted, setSorted] = React.useState(true);

    useEffect(() => {
        getArticles(page);

    }, [page, getArticles]);



    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setArticlePage(page);
        window.scrollTo(0, 400);
    };

    const sortByName = () => {
        if (sorted) {
            articles.sort(function (a: Article, b: Article) {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });
            setSorted(false)
        } else {
            articles.sort(function (a: Article, b: Article) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            setSorted(true)
        }
        // setSortArticles(articles)

    };


    return (
        <div className="main">
            <div className="banner">
                <div className="banner-container">
                    <div className="banner-text">
                        <h1>See it before you buy it!</h1>
                        <p>Computer Vision solutions for interior design</p>
                    </div>
                    <div className="banner-buttons">
                        <Button className="banner-button-fitting-room"
                                href="https://demo.wizart.tech/"
                                color="red"
                                size="medium">
                            <div className="webdemo-svg">

                                <Catalog width="0.7vw" height="0.7vw"/>
                            </div>
                            SEE THE WEBDEMO
                        </Button>
                        <Button className="banner-button-website"
                                href="https://wizart.tech/"
                                color="grey"
                                size="medium">
                            <div className="website-svg">
                                <Wizart/>
                            </div>
                            VISIT OUR WEBSITE
                        </Button>
                    </div>
                </div>
                <div className="banner-image"/>
                <div className="banner-gif"/>
                {/*<img src="https://static.wixstatic.com/media/bc22fc_8baad5e8c6e94e728dae83c481dc28a7~mv2.gif"/>*/}

            </div>

            {articlesLoading ? <div className="articles-loading"><CircularProgress size={72}/></div> :
                <div className="cards">
                    <div className="cards-container">
                        <div className="title">
                            Catalog
                        </div>
                        <div className="filter">
                            <p style={{width: 180}}>Sort by: <span>Name</span>
                                <span onClick={sortByName} className="filter-icon">
                                    {sorted ? <ArrowDownIcon/> : <ArrowUpwardIcon/>}
                                    </span>
                            </p>
                            <p style={{width: 275}}>Display: <span>20 products per page</span></p>
                        </div>
                    </div>
                    {articles.length === 0 ? <div className="not-found">No items found</div> : articles.map((article: Article, key: number) => {
                                return <Card
                                    key={key}
                                    article={article}
                                    nextArticle={articles[key + 1]}
                                    prevArticle={articles[key - 1]}
                                />
                        }
                    )}
                </div>
            }

            <Pagination style={articles.length === 0 ? { display: "none" }: {marginTop: 20}} count={numOfPages} page={page} onChange={changePage} color="secondary"/>



        </div>
    );
};

export default Main;