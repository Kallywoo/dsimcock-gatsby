import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Accordion } from '../components/Accordion';

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
            fluid {
              src
            }
          }
        }
      }
    }
  }
`;

export default function ProjectsPage({ data: { projectList: { projects } }}) {
    return (
        <main>
            <MainContent>
                <List>
                    {projects ? 
                        projects.map(project => 
                            <ListItem key={project.id}><Accordion>{project}</Accordion></ListItem>
                        ) : "no work to be shown"
                    }
                </List>
            </MainContent>
        </main>
    );
}

const MainContent = styled.div`
    background-color: #ECEBFF;
    margin: 1.3em auto;
    padding: 0.975em;
    width: 70%;
    max-width: 940px;
    @media only screen and (max-width: 480px) {
        width: auto;
    }
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
    }
    &:last-child {
        border-bottom: none;
    }
`;