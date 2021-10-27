<template>
  <Table
    :tokens="pool ? pool.tokensList : []"
    :pool-swaps="poolSwaps"
    :is-loading="loading || isLoadingPoolSwaps"
    :is-loading-more="poolSwapsIsFetchingNextPage"
    :is-paginated="poolSwapsHasNextPage"
    @load-more="loadMorePoolSwaps"
    :no-results-label="$t('noTransactionsPool')"
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { flatten } from 'lodash';

import usePoolSwapsQuery from '@/composables/queries/usePoolSwapsQuery';

import Table from './Table.vue';

import { FullPool } from '@/services/balancer/subgraph/types';

export default defineComponent({
  components: {
    Table
  },

  props: {
    pool: {
      type: Object as PropType<FullPool>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    /**
     * COMPOSABLES
     */
    const route = useRoute();

    /**
     * STATE
     */
    const id = route.params.id as string;

    /**
     * QUERIES
     */
    const poolSwapsQuery = usePoolSwapsQuery(id);

    /**
     * COMPUTED
     */
    const poolSwaps = computed(() =>
      poolSwapsQuery.data.value
        ? flatten(poolSwapsQuery.data.value.pages.map(page => page.poolSwaps))
        : []
    );

    const isLoadingPoolSwaps = computed(() => poolSwapsQuery.isLoading.value);

    const poolSwapsHasNextPage = computed(
      () => poolSwapsQuery.hasNextPage?.value
    );

    const poolSwapsIsFetchingNextPage = computed(
      () => poolSwapsQuery.isFetchingNextPage?.value
    );

    /**
     * METHODS
     */
    function loadMorePoolSwaps() {
      poolSwapsQuery.fetchNextPage.value();
    }

    return {
      // computed
      isLoadingPoolSwaps,
      poolSwaps,
      poolSwapsHasNextPage,
      poolSwapsIsFetchingNextPage,
      // methods
      loadMorePoolSwaps
    };
  }
});
</script>
