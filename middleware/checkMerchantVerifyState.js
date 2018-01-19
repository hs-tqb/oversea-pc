export default function ( {route, router, store, redirect} ) {
  if ( 
    process.browser && 
    route.name!=='login' && 
    route.name!=='preview' && 
    route.name!=='pdf' && 
    !!store.state.merchantInfo && 
    store.state.merchantInfo.verifyState!==1 
  ) {
    return redirect('/preview');
  }
}