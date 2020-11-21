<template>
    <div id="app">
        <app-com />
    </div>
</template>
<script>
import appCom from './components/common/appCom'

export default {
  components: {
    appCom
  },
  created () {
    console.log(process.env.NODE_ENV)
  }
}
</script>
