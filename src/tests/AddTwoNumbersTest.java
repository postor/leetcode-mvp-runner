package tests;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONObject;

import utils.LeetUtil;
import utils.ListNode;

public class AddTwoNumbersTest {
	public static void main(String[] args) throws IOException {
		
	}
	
	public AddTwoNumbersTest() throws IOException {
		ArrayList<JSONObject> jsonarray = LeetUtil.loadData("add-two-numbers");
		jsonarray.forEach(it -> assertOne(it));
		System.out.println("all pass!");
	}

	public void assertOne(JSONObject obj) {
		JSONArray params = obj.getJSONArray("params");
		JSONArray result = obj.getJSONArray("result");

		int[] param0 = LeetUtil.Json2intArray(params.getJSONArray(0));
		int[] param1 = LeetUtil.Json2intArray(params.getJSONArray(1));

		Solution sln = new Solution();
		int[] slnRtn = LeetUtil.linkedNode2array(
				sln.addTwoNumbers(LeetUtil.array2linkedNode(param0), LeetUtil.array2linkedNode(param1)));

		int[] expectedRtn = LeetUtil.Json2intArray(result);

		if (!Arrays.equals(slnRtn, expectedRtn)) {
			String input = LeetUtil.toJson(param0) + "," + LeetUtil.toJson(param1);
			String output = LeetUtil.toJson(slnRtn);
			String expected = LeetUtil.toJson(expectedRtn);
			System.err.print("Input:" + input + " \nOutput:" + output + " \nExpect:" + expected);
			System.exit(1);
		}

	}

	//LEETCODE_MVP_ANSWER

	class Solution {
		public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
			return add(l1, l2, 0);
		}

		private ListNode add(ListNode la, ListNode lb, int step) {
			if (la == null && lb == null && step == 0)
				return null;
			int val = (la != null ? la.val : 0) + (lb != null ? lb.val : 0) + step;
			int newStep = val >= 10 ? 1 : 0;
			int newVal = val >= 10 ? val - 10 : val;

			ListNode node = new ListNode(newVal);
			node.next = add(la != null ? la.next : null, lb != null ? lb.next : null, newStep);
			return node;
		}
	}
}

