import type { ConditionData } from "@/components/search/SearchCategoryModal";

const getSort = (data: any) => {
    const condition = data.find((item: any) => item.isSelected);

    if (!condition) {
      return ['viewCount', 'desc'];
    }

    return [condition.type, condition.orderType];
};

const getNewData = (prev: any, curr: any) => {
    let newData: any = [];

    if (prev.length === 0) {
        newData = curr;
    } else {
        curr.forEach((data: any) => {
        const targetData = prev.find((item: any) => item.id === data.id);

        if (!targetData) {
        newData.push(data);
        }
    });
    }

    return newData;
};

const getNewConditionData = (data: Array<ConditionData>, index: number): Array<ConditionData> => {
    return data.map((item, idx) => {
      if (index === idx) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }

      return item;
    });
  };

export {
    getSort,
    getNewData,
    getNewConditionData,
};