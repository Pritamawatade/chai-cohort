function distributeGifts(totalGifts, friends) {
    // Each friend gets one gift until we run out
    return Math.min(totalGifts, friends);
}


  console.log(distributeGifts(10,5))