package utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

public class LeetUtil {
	public static ArrayList<JSONObject> loadData(String key) throws IOException {
		String jsonStr = readFile("__data__/" + key + ".data.json");
		return JsonObjects2Arr(new JSONArray(jsonStr));
	}

	public static String readFile(String path) throws IOException {
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded);
	}

	public static ArrayList<JSONObject> JsonObjects2Arr(JSONArray jsonarray) {
		ArrayList<JSONObject> t = new ArrayList<JSONObject>();
		for (int i = 0; i < jsonarray.length(); i++) {
			t.add(jsonarray.getJSONObject(i));
		}
		return t;
	}

	public static int[] Json2intArray(JSONArray jsonarray) {
		int[] t = new int[jsonarray.length()];
		for (int i = 0; i < jsonarray.length(); i++) {
			t[i] = jsonarray.getInt(i);
		}
		return t;
	}

	public static boolean equalWithoutOrder(ArrayList<Integer> t1, ArrayList<Integer> t2) {
		t1.sort((Integer a, Integer b) -> a - b);
		t2.sort((Integer a, Integer b) -> a - b);
		return t1.equals(t2);
	}

	public static boolean equalWithoutOrder(int[] t11, int[] t22) {
		ArrayList<Integer> t1 = arr2list(t11);
		ArrayList<Integer> t2 = arr2list(t22);
		t1.sort((Integer a, Integer b) -> a - b);
		t2.sort((Integer a, Integer b) -> a - b);
		return t1.equals(t2);
	}

	public static ArrayList<Integer> arr2list(int[] t) {
		ArrayList<Integer> t1 = new ArrayList<Integer>();
		for (int i : t) {
			t1.add(i);
		}
		return t1;
	}

	public static String toJson(int[] t) {
		JSONArray arr = new JSONArray(t);
		return arr.toString();
	}

	public static ListNode array2linkedNode(int[] arr) {
		if (arr.length == 0)
			return null;
		ListNode rtn = new ListNode(arr[0]);
		ListNode cur = rtn;
		for (int i = 1; i < arr.length; i++) {
			cur.next = new ListNode(arr[i]);
			cur = cur.next;
		}
		return rtn;
	}

	public static int[] linkedNode2array(ListNode root) {
		ArrayList<Integer> t = new ArrayList<Integer>();
		// from node
		ListNode cur = root;
		while (cur != null) {
			t.add(cur.val);
			cur = cur.next;
		}
		// to array
		int[] rtn = new int[t.size()];
		for (int i = 0; i < t.size(); i++) {
			rtn[i] = t.get(i);
		}
		return rtn;
	}
}
