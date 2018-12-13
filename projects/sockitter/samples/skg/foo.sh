curl -sS -X POST http://35.185.251.4:8983/solr/Fusion_Starter_for_4_1_0/query -d 'rows=0&q=*:*
&back=*:*                                  
&fore=age:[35 TO *]                        
&json.facet={
  hobby : {
    type : terms,
    field : hobbies,
    limit : 5,
    sort : { r1: desc },                   
    facet : {
      r1 : "relatedness($fore,$back)",     
      location : {
        type : terms,
        field : state,
        limit : 2,
        sort : { r2: desc },               
        facet : {
          r2 : "relatedness($fore,$back)"  
        }
      }
    }
  }
}'
