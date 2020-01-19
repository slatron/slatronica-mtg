<template>
  <div class="page-content m-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-48">
    <h2 class="text-blue-lt font-bold mb-2 text-lg sm:text-2xl tracking-widest">
      Blueprint Process
    </h2>
    <h3>A Beginning Guide to Magic Blueprint Alters</h3>
    <section>
      <p>The blueprint alter is perfect for beginners. If you have little artistic or painting skill and are looking to start the hobby, this is a good way to get start. It gets you used to painting several thin layers without having to pay attention to color matching.</p>
      <p>I took some pictures at each stage of my blueprint process. Wanted to share here how I streamlined the process to do eight of these at a time. Before that, It would take me around 1.5 hours for each alter. By setting these up in an assembly line process, I can finish eight rocks in around four hours.</p>
      <p>The trem "rock" will refer to any mana artifact in the game. Specifically the main subject image on the card. Signets and Talismans come out the best since they are usually prominant in the art and symetrical. It also helps in game visually to make all mana rocks look similar.</p>
      <p>
        I use <a
          href="https://www.thearmypainter.com/"
          target="_blank"
        >Army Painter</a> acrylic paints. Their "Deep Blue" shade works great for blueprint color. The white ink pen is a 05 Gelly Roll. For the grey primer, I use a Uni Posca 1.8-2.5mm paint pen.
      </p>
      <h4>Step One: Mount the Rocks</h4>
      <img :src="IMG_1">
      <p>Any cardboard big enough to fit all eight cards will work. You need something light enough to easily move around while painting. I use the thin cardboard that comes with butter. Two of these taped together is the perfect size to layout eight cards. Ticky-tack in the corners holds well.</p>
      <h4>Step Two: Mark the Diagonal Divide</h4>
      <img :src="IMG_2">
      <p>Pick the most symetrical part of the rock. Draw a line in pencil to bisect the rock. Use a ruler. You can get creative with this. You'll be drawing the other half of the object in a later step.</p>
      <h4>Step Three: Prime Time</h4>
      <img :src="IMG_3">
      <p>Use an acrylic or oil-based grey paint pen to prime the card. This should cover all of the image not part of the rock. Cover the half of the rock that you will be replacing with the illustration.</p>
      <h4>Step Four: Blue Yourselves</h4>
      <img :src="IMG_4">
      <p>In several thin layers, paint over the primer with a dark blue. I use "Deep Blue" from Army Painter. Don't worry if the paint seems too thin at first, you will need several layers here. Your goal is to make the card solid blue without adding thickness to the card. If your alter is too thick, it won't be playable. The paint shoudn't be too thin that it gets absorbed and warps the card. Just thick enough to stay in place.</p>
      <h4>Step Five: White Lines</h4>
      <p>Here's the artsy part. After the paint dries, use the ruler to finish the diagonal line across the card. Stay off the text areas. Then, finish out the other half of the rock. You can use the original as a reference image. I try to only look at the other half of the rock in front of me.</p>
      <img :src="IMG_5">
      <h4>Step Six: Tron Grid</h4>
      <img :src="IMG_6">
      <p>I drew notches on the side of another piece of cardboard 8mm apart. It's not in the imagee, but I lay that on the side of the cards and use the ruler to get each line horizontally. Then I use the guide on the top to draw each vertical line. Stay clear of the rock and the text areas. Don't worry too much about getting the gridlines perfect. I used to take too much time getting each line perfect. Force yourself to eyeball this a couple times on a practice sheet of paper.</p>
      <h4>Step Seven: Finishing Touches</h4>
      <img :src="IMG_7">
      <p>Add any details to the illustration. This is all style choice. I like adding alien glyphs on the side plus my initials. Spray them with a quick, thin coat of acrylic finish and yer done.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BlueprintProcess',
  created () {
    for (var i = 1; i <= 7; i++) {
      const thisImgName = `IMG_${i}`
      this[thisImgName] = require(`@/assets/images/process/blueprints/blueprints-${i}.jpg`)
    }
  }
}
</script>

<style lang="scss" media="screen">
h3  {
  margin-bottom: 2rem;
}
h4  {
  font-weight: bold;
  font-size: 20px;
  border-top: 1px solid #111;
  margin: 1.5rem 0;
  padding: 1.5rem 0 0;
}
p {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}
</style>
