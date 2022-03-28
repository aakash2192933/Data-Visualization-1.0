
export const formatSankeyData = (data) => {
    const sourceNodes = new Set(data.map(item => item.source));
    const targetNodes = new Set(data.map(item => item.target));

    const nodes = [ ...new Set([ ...sourceNodes, ...targetNodes ]) ].map(item => ({ id: item }));

    // .map(item => ({ id: item }));

    const formatedData = {
        nodes,
        links: data,
    };

    return formatedData;
}