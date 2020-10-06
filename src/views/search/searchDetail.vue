<template>
    <div>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                @scroll="ListenScroll">
            <div>
                <search @isSearchResultFunc="isSearchResultFunc" :isShow="isSearchResult"/>
                <div v-if="!isSearchResult">
                    <div>
                        <img src="../../assets/jietu.jpg" alt="" style="width: 100%;height: auto">
                        <historcal-record @isSearchResultFunc="isSearchResultFunc"/>
                        <hot-search @isSearchResultFunc="isSearchResultFunc"/>
                    </div>
                </div>
                <div v-if="isSearchResult">
                    <search-tabbar @backtop="getbacktop"/>
                </div>
                <search-suggest @isSearchResultFunc="isSearchResultFunc"/>
            </div>
        </scroll>
    </div>
</template>

<script>
    import search from "./searchChild/search";
    import hotSearch from "./searchChild/hotSearch"
    import Scroll from "../../components/scroll"
    import historcalRecord from "./searchChild/historcalRecord"
    import searchSuggest from "./searchChild/searchSuggest";
    import searchTabbar from "./searchResultChild/searchTabbar";

    export default {
        name: "searchDetail",
        mounted() {
            this.$nextTick(() => {
                if (this.$store.state.audioEl) {
                    this.$refs.scroll.$el.style.height = 92 + 'vh';
                }
            })
        },
        data() {
            return {
                isSearchResult: false,
                backTop: '',
                scrollOnce: true,
            }
        },

        components: {
            search,
            hotSearch,
            Scroll,
            historcalRecord,
            searchSuggest,
            searchTabbar
        },
        methods: {
            isSearchResultFunc(val) {
                this.isSearchResult = val
            },
            getbacktop() {
                this.$refs.scroll.scrollTo(0, 0, 400)
            },
            ListenScroll(position) {
                if (this.$store.state.audioEl && this.scrollOnce) {
                    this.scrollOnce = false;
                    this.$refs.scroll.$el.style.height = 92 + 'vh';
                    this.$refs.scroll.refresh();
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        width: 100vw;
        overflow: hidden;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        touch-action: none;
    }
</style>