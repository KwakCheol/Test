package com.test.test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {
	static int juxing_width = 500;
	static int juxing_height = 500;
	static int juxing_count = 0;
	
	static List<HashMap<String,Integer>> list = new ArrayList<HashMap<String,Integer>>();//원본
	static int[] arr_juxing_children_width = {85,85,85,85, 115,115,115, 60,60,60,60,60, 105,105,105,105, 80,80,80, 70,70,70,70, 150,150, 65,65,65,65,65, 75,75,75,75,75,75};
	static int[] arr_juxing_children_height = {70,70,70,70, 60,60,60,   30,30,30,30,30, 65,65,65,65,     60,60,60, 60,60,60,60, 70,70,   50,50,50,50,50, 30,30,30,30,30,30};
	static int[] arr_juxing_children_count = {4,3,5,4,3,4,2,5,6};
	
	int margin = 10;
	
	
	static List<HashMap<String,Integer>> list2 = new ArrayList<HashMap<String,Integer>>();//sort후 데이터 같은데이터 count 추가후 데이터
	
	
	static List<HashMap<String,Integer>> list3 = new ArrayList<HashMap<String,Integer>>();
	public static void main(String[] args) {
		
		int total = 0;
		//데이터 세팅
		for(int i=0;i<arr_juxing_children_width.length;i++) {
			HashMap<String,Integer> map= new HashMap<String, Integer>();
			map.put("juxing_children_width", arr_juxing_children_width[i]);
			map.put("juxing_children_height", arr_juxing_children_height[i]);
			map.put("juxing_children_size", arr_juxing_children_width[i]*arr_juxing_children_height[i]);
			list.add(map);
			total+=arr_juxing_children_width[i]*arr_juxing_children_height[i];
		}
		juxing_count = list.size();
		
		System.out.println("total:"+total);
		System.out.println("juxing_width * juxing_height:"+juxing_width * juxing_height);
		if(total > juxing_width * juxing_height) {
			System.out.println("사이즈가 넘어납니다.");
			return;
		}
		
		System.out.println("sorting전=======");
		for(Map<String,Integer> one:list) {
			System.out.println(one);
		}
		
		
		Collections.sort(list, new Comparator<HashMap<String, Integer >>() {
	        @Override
	        public int compare(HashMap<String, Integer> first,
	                HashMap<String, Integer> second) {
	            
	            int firstValue = Integer.valueOf(first.get("juxing_children_size"));
	            int secondValue = Integer.valueOf(second.get("juxing_children_size"));
	            
	            // 내림차순 정렬
	            if (firstValue > secondValue) {
	                return -1;
	            } else if (firstValue < secondValue) {
	                return 1;
	            } else /* if (firstValue == secondValue) */ {
	                return 0;
	            }
	        }
	    });
		
		System.out.println("sorting후=======");
		for(Map<String,Integer> one:list) {
			System.out.println(one);
		}
		
		int arr_juxing_children_count = 0;
		int cnt = 0;
		for(int i=0;i<list.size();i++) {
			if(i < list.size() - 1) {
				arr_juxing_children_count++;
				if((int)list.get(i).get("juxing_children_size") != (int)list.get(i+1).get("juxing_children_size")) {
					cnt++;
					list.get(i).put("arr_juxing_children_count", arr_juxing_children_count);
					HashMap<String,Integer> map= new HashMap<String, Integer>();
					map.put("juxing_children_width", list.get(i).get("juxing_children_width"));
					map.put("juxing_children_height", list.get(i).get("juxing_children_height"));
					map.put("juxing_children_size",list.get(i).get("juxing_children_size"));
					map.put("arr_juxing_children_count", arr_juxing_children_count);
					map.put("juxing_children_number_key", cnt);
					list2.add(map);
					arr_juxing_children_count = 0;
				}else {
					continue;
				}
				
			}else {
				cnt++;
				arr_juxing_children_count++;
				list.get(i).put("arr_juxing_children_count", arr_juxing_children_count);
				HashMap<String,Integer> map= new HashMap<String, Integer>();
				map.put("juxing_children_width", list.get(i).get("juxing_children_width"));
				map.put("juxing_children_height", list.get(i).get("juxing_children_height"));
				map.put("juxing_children_size",list.get(i).get("juxing_children_size"));
				map.put("arr_juxing_children_count", arr_juxing_children_count);
				map.put("juxing_children_number_key", cnt);
				list2.add(map);
			}
		}
		
		System.out.println("count후 ===========");
		for(Map<String,Integer> one:list2) {
			System.out.println(one);
		}
		
		
		
		int mod_total_width = juxing_width - (int)list2.get(0).get("juxing_children_width");
		for(int i=0;i<list2.size();i++) {
			
		}
	

	}
}
