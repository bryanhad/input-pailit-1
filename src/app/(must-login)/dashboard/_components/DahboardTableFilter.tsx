// import React from 'react'

// async function filterCreditors(formData: FormData) {
//     "use server";

//     // await new Promise((res) => setTimeout(res, 2000));

//     const formValues = Object.fromEntries(formData.entries());

//     const { location, query, remote, type } = jobFilterSchema.parse(formValues);

//     const searchParams = new URLSearchParams({
//         // the code below is to ensure to pass the object conditionally.. if the query is defined, then pass the object containing the trimmed query
//         ...(query && { query: query.trim() }),
//         ...(type && { type }),
//         ...(location && { location }),
//         ...(remote && { remote: "true" }),
//     });

//     // Below is what searchParams.toString() result into...
//     // "[fieldName]=[value]&[fieldName]=[value]&[fieldName]=[value]&...."
//     redirect(`/?${searchParams.toString()}`);
// }

// function DahboardTableFilter() {
//   return (
//     <div>DahboardTableFilter</div>
//   )
// }

// export default DahboardTableFilter