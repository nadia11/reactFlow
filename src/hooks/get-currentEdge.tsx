import { useReactFlow } from "reactflow";

export  const  useEdgesByNodeId=()=> {
  const { getEdges } = useReactFlow();

  const getEdgesByNodeId = (nodeId:string) => {
    const edges = getEdges();
    const edge = edges.find(edge => edge.source === nodeId || edge.target === nodeId);
    return edge;
  };

  return {
    getEdgesByNodeId,
  }
}

