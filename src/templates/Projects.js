import React, { useEffect, useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { Accordion } from '../components/Accordion';
import { GalleryModal } from '../components/GalleryModal';
import SEO from '../components/SEO';

export const query = graphql`
    query($slug: String!) {
        projectList: contentfulAreaOfWork(slug: { eq: $slug } ) {
            projects {
                ... on ContentfulProject {
                    id
                    title
                    images {
                        id
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
            }
        }
    }
`;

export default function ProjectsPage({ data, pageContext }) {

    const { projects } = data.projectList;

    const [masterArray, setMasterArray] = useState([]);
    const [cachedTab, setCachedTab] = useState(null);

    const arrayIndex = useRef(0);

    const modalRef = useRef(null);

    const ToggleModal = (e) => {
        if(e.target.name === "modal") { // filters out when accordion button itself gets captured, we're only interested in images within
            setCachedTab(document.activeElement); // captures the last focused element to jump back to after the modal is closed (wonder if there's another way to do this with React?)
            arrayIndex.current = masterArray.findIndex((element) => element.id === e.target.id); // searches masterArray to find object with matching id as clicked container and saves it
            modalRef.current.openModal(); // ...opens the modal
        };
    };

    useEffect(() => { // generate array of all images and titles from all projects for modal navigation

        let array = [];
        let i = 0;
    
        for(let index in projects) {
            for(let item in projects[index].images) {
                array.push(projects[index].images[item]);
                array[i].title = projects[index].title;
                i++;
            };
        };
    
        setMasterArray(array);

    }, [projects]);

    return (
        <>
            <SEO title={pageContext.title} description={`${pageContext.title} work examples`} />
            <main>
                <MainContent>
                    <List>
                        {projects ? 
                            projects.map(project => 
                                <ListItem key={project.id} onClickCapture={(e) => ToggleModal(e)}>
                                    <Accordion title={project.title}>
                                        {project.images?.map(image => 
                                            <ModalButton 
                                                id={image.id} 
                                                key={image.id}
                                                name="modal"
                                                aria-label="Open Gallery Modal"
                                            >
                                                <Image image={image.gatsbyImageData} alt={image.alt ? image.alt : ""} />
                                            </ModalButton>
                                        )}
                                    </Accordion>
                                </ListItem>
                            ) : "no work to be shown"
                        }
                    </List>
                </MainContent>
                <GalleryModal 
                    ref={modalRef} 
                    gallery={masterArray}
                    index={arrayIndex} 
                    length={masterArray?.length}
                    cache={cachedTab}
                    tabIndex={-1}
                />
            </main>
        </>
    );
};

const MainContent = styled.div`
    background-color: #ECEBFF;
    margin: 1.3em auto;
    padding: 0.975em;
    width: 70%;
    max-width: 970px;

    @media only screen and (max-width: 1000px) {
        width: 90%;
        max-width: 730px;
    };

    @media only screen and (max-width: 480px) {
        width: auto;
    };
`;

const List = styled.ul`
    padding: 0;
    list-style-type: none;
    margin: 0 auto;
    width: 90%;
    text-align: center;
`;

const ListItem = styled.li`
    border-top: 1px solid white;
    border-bottom: 1px solid #c7deef;

    &:first-child {
        border-top: none;
    };

    &:last-child {
        border-bottom: none;
    };
`;

const Image = styled(GatsbyImage)`
    width: 150px;
    margin: 1.3em 0.65em;
    pointer-events: none;

    @media only screen and (max-width: 402px) {
        width: 90%;
    };
`;

const ModalButton = styled.button`
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
`;