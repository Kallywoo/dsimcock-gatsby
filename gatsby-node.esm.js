import path from 'path';

async function createProjectListPages({ graphql, actions }) {
    const listTemplate = path.resolve('./src/templates/Projects.js');

    const { data } = await graphql(`
      query {
        areas: allContentfulAreaOfWork(filter: {node_locale: {eq: "en-US"}}) {
          nodes {
            name
            slug
          }
        }
      }
    `);

    data.areas.nodes.forEach(area => {
        actions.createPage({
            path: `work/${area.slug}`,
            component: listTemplate,
            context: {
              slug: area.slug,
            }
        });
    console.log(`Creating page for ${area.name}`);
    });
}

export async function createPages(params) {
    await createProjectListPages(params);
}