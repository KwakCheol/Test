package com.test.test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class A0 {
	static int[] a = {0,0,0,0,0,0,0,0,0};
	
	static List<HashMap<String,Integer>> list = new ArrayList<HashMap<String,Integer>>();//원본
	static int[] arr_a = {6,6,5,5,7,7,7};
	
	static List<HashMap<String,Integer>> list2 = new ArrayList<HashMap<String,Integer>>();
	
	
	 public static void main(String[] args) {
		 getData();
	 
	 }
	 
	
	
	public static void setValue(Map<String,Integer> one) {
		switch (one.get("size")) {
		case 0:
			a[0] = one.get("count");
			break;
		case 1:
			a[1] = one.get("count");
			break;
		case 2:
			a[2] = one.get("count");
			break;
		case 3:
			a[3] = one.get("count");
			break;
		case 4:
			a[4] = one.get("count");
			break;
		case 5:
			a[5] = one.get("count");
			break;
		case 6:
			a[6] = one.get("count");
			break;
		default:
			a[7] = one.get("count");
			break;
		}
	}
	
	public static int[] getData() {
		
		for(int i=0;i<a.length;i++) {
			a[i]=0;
		}
		
		for(int i=0;i<arr_a.length;i++) {
			HashMap<String,Integer> map= new HashMap<String, Integer>();
			map.put("size", arr_a[i]);
			list.add(map);
		}
		
		System.out.println("sorting전=======");
		for(Map<String,Integer> one:list) {
			System.out.println(one);
		}
		
		Collections.sort(list, new Comparator<HashMap<String, Integer >>() {
	        @Override
	        public int compare(HashMap<String, Integer> first,
	                HashMap<String, Integer> second) {
	            
	            int firstValue = Integer.valueOf(first.get("size"));
	            int secondValue = Integer.valueOf(second.get("size"));
	            
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
		
		int count = 0;
		for(int i=0;i<list.size();i++) {
			if(i < list.size() - 1) {
				count++;
				if((int)list.get(i).get("size") != (int)list.get(i+1).get("size")) {
					HashMap<String,Integer> map= new HashMap<String, Integer>();
					map.put("count", count);
					map.put("size", list.get(i).get("size"));
					list2.add(map);
					count = 0;
				}else {
					continue;
				}
				
			}else {
				count++;
				list.get(i).put("count", count);
				HashMap<String,Integer> map= new HashMap<String, Integer>();
				map.put("count", count);
				map.put("size", list.get(i).get("size"));
				list2.add(map);
			}
		}
		
		System.out.println("count후 ===========");
		for(Map<String,Integer> one:list2) {
			System.out.println(one);
		}
		
		
		for(Map<String,Integer> one:list2) {
			setValue(one);
		}
	
		
		if(a[7] >= 2) {
			a[6] += a[7]/2;
			a[7] = a[7]%2;
		}
		
		if(a[6] >= 2) {
			a[5] += a[6]/2;
			a[6] = a[6]%2;
		}
		
		if(a[5] >= 2) {
			a[4] += a[5]/2;
			a[5] = a[5] % 2;
		}
		
		if(a[4] >= 2) {
			a[3] += a[4]/2;
			a[4] = a[4] % 2;
		}
		
		if(a[3] >= 2) {
			a[2] += a[3]/2;
			a[3] = a[3]%2;
		}
		
		if(a[2] >= 2) {
			a[1] += a[2]/2;
			a[2] = a[2]%2;
		}
		
		if(a[1] >= 2) {
			a[0] += a[1]/2;
			a[1] = a[1]%2;
		}
		
		System.out.println("최종값 보기============");
		for(int a:a) {
			System.out.println(a);
		}
		
		return a;
	}
}
