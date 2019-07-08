<template>
  <div class="grid-container">
    <GridCard
      v-for="card in gallery_list"
      v-bind:key="card.name"
      v-bind:card-data="card"
    ></GridCard>
  </div>
</template>

<script>
import GridCard from '@/components/GridCard';

export default {
  name: 'Gallery',
  components: {
    GridCard
  },
  data() {
    return {
      gallery_list: [
        {
          id: '824423ff-6441-4be6-b754-810adf9ca6a2',
          name: 'Thalia, Guardian of Thraban'
        },
        {
          id: '19caada3-7548-44d4-bf3f-680f7d3fa7b8',
          name: 'Angel of Mercy'
        },
        {
          id: '3c02b8ee-84cb-44cb-ba14-9e725a9d03ee',
          name: 'Ponder',
          date: '2019-07-05'
        },
        {
          id: '7335e500-342d-476d-975c-817512e6e3d6',
          name: 'Gishath, Sun\'s Avatar'
        },
        {
          id: 'bb2e9465-f5ba-4c7b-9f03-d40dc8394acd',
          name: 'Kor Skyfisher'
        },
        {
          id: '1c7d50d6-b63a-4d8c-88fa-1d78ae693a45',
          name: 'Overgrown Tom'
        },
        {
          id: 'c9c607d3-a8bf-4ba3-9c10-7509f195b41f',
          name: 'Chain Lightning'
        },
        {
          id: '21e1161f-bd2c-45a7-a86b-3b2e5210f148',
          name: 'Fireblade Artist'
        },
        {
          id: 'b2e2a777-0705-4a37-937d-c6e020ebc0f0',
          name: 'Goblin Guide'
        },
        {
          id: '42bd038d-1005-4095-9310-108caa56465f',
          name: 'Mind Stone'
        },
        {
          id: '5e669a01-84d3-4fcc-8396-9e987bd89b4f',
          name: 'Tajic, Legion\'s Edge'
        },
        {
          id: '127c969b-1c9a-4265-af0e-5b9dbe136064',
          name: 'Dawntreader Elk'
        },
        {
          id: '359d1b13-6156-43b0-a9a7-6bfff36c1a91',
          face: 0,
          name: 'Thing In the Ice Front'
        },
        {
          id: '359d1b13-6156-43b0-a9a7-6bfff36c1a91',
          face: 1,
          name: 'Thing In the Ice Back'
        },
        {
          id: '47ac0f77-1294-4de9-93d1-141a9f314f98',
          name: 'Baleful Strix'
        },
        {
          id: '307d4236-1e54-43e3-83f1-063d49d16dda',
          name: 'Birds of Paradise'
        },
        {
          id: '53aa3ea3-fb3c-4758-8035-20ec0a94b730',
          name: 'Elvish Visionary'
        },
        {
          id: '1fdcc0c3-4029-4fc3-a486-5d7f45c910bd',
          name: 'Everflowing Chalice'
        },
        {
          id: '179e954f-1d90-4ef4-b800-25845cc338e2',
          name: 'Goblin Bombardment'
        },
        {
          id: '49b3ce74-40d2-4e97-aa40-a4b6419e10ba',
          name: 'Golgari Signet'
        },
        {
          id: 'c2ad8639-e586-47f4-baca-2a1af5aa281b',
          name: 'Restoration Angel'
        },
        {
          id: '4e0c1d0a-2651-4961-8b70-ff78093732ce',
          name: 'The Locust God'
        },
        {
          id: 'dfc1ecf5-5801-45a1-98fe-8c058db80292',
          name: 'Whitemane Lion'
        }
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flexgrid {
  display: flex;
}
</style>
